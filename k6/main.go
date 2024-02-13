package main

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"sync"
	"time"
)

func main() {
	var wg sync.WaitGroup
	con := 100
	wg.Add(con)

	var success int
	var clientError int
	var serverError int
	var timeout int

	for i := 0; i < con; i++ {
		i := i
		go func() {
			defer wg.Done()

			// File paths
			filePath1 := "F-1.webp"
			filePath2 := "F-2.webp"

			// URL
			url := "URL"

			var wg2 sync.WaitGroup
			eachReq := 10
			wg2.Add(eachReq)
			for v := 0; v < eachReq; v++ {
				v := v
				go func() {
					defer wg2.Done()

					// Open file 1
					file1, err := os.Open(filePath1)
					if err != nil {
						fmt.Println("Error opening file1: ", err)
						return
					}
					defer file1.Close()

					// Open file 2
					file2, err := os.Open(filePath2)
					if err != nil {
						fmt.Println("Error opening file2: ", err)
						return
					}
					defer file2.Close()

					// Buffer
					body := &bytes.Buffer{}
					writer := multipart.NewWriter(body)

					// FIeld 1
					part1, err := writer.CreateFormFile("image1", filePath1)
					if err != nil {
						fmt.Println("Error writing to buffer for file1: ", err)
						return
					}
					_, err = io.Copy(part1, file1)
					if err != nil {
						fmt.Println("Error copying file1 to buffer: ", err)
						return
					}

					// Field 2
					part2, err := writer.CreateFormFile("image2", filePath2)
					if err != nil {
						fmt.Println("Error writing to buffer for file2: ", err)
						return
					}
					_, err = io.Copy(part2, file2)
					if err != nil {
						fmt.Println("Error copying file2 to buffer: ", err)
						return
					}

					time.Sleep(1 * time.Second)

					// x-api-key Header
					writer.Close()
					req, err := http.NewRequest("POST", url, body)
					if err != nil {
						fmt.Println("Error creating request: ", err)
						return
					}
					req.Header.Set("Content-Type", writer.FormDataContentType())
					req.Header.Set("x-api-key", "<key>")

					// Send request
					client := &http.Client{
						Timeout: 10 * time.Second,
					}
					response, err := client.Do(req)
					if err != nil {
						fmt.Printf("Timeout: %v\n", err)
						timeout++
						return
					}
					defer response.Body.Close()

					// Increment
					if response.StatusCode >= 200 && response.StatusCode < 300 {
						success++
					}
					if response.StatusCode >= 400 && response.StatusCode < 500 {
						fmt.Printf("%d: %d: Response Status:%s\n", i, v, response.Status)
						clientError++
					}
					if response.StatusCode >= 500 {
						fmt.Printf("%d: %d: Response Status:%s\n", i, v, response.Status)
						serverError++
					}

					// Print response
					var responseBody bytes.Buffer
					_, err = io.Copy(&responseBody, response.Body)
					if err != nil {
						fmt.Println("Error reading response body: ", err)
						return
					}
					fmt.Printf("%d: Response Body:%s\n", i, responseBody.String())
				}()
			}
			wg2.Wait()
		}()
	}

	wg.Wait()

	fmt.Printf("2xx: %d, 4xx: %d, 5xx: %d, timeout: %d\n", success, clientError, serverError, timeout)
}
