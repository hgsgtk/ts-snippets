package main

import (
	"encoding/json"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"

	"github.com/gorilla/websocket"
)

type msg struct {
	Action string `json:"action"`
	Msg    string `json:"msg"`
}

// API_ENDPOINT_HOST=<host> API_ENDPOINT_PATH=<path> go run main.go
func main() {
	u := url.URL{
		Scheme: "wss",
		Host:   os.Getenv("API_ENDPOINT_HOST"),
		Path:   os.Getenv("API_ENDPOINT_PATH")}

	d := websocket.DefaultDialer
	proxyURL, err := url.Parse("http://localhost:51474")
	if err != nil {
		log.Fatalf("Error parsing the proxy URL: %v", err)
	}
	d.Proxy = http.ProxyURL(proxyURL)
	conn, _, err := d.Dial(u.String(), nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer conn.Close()

	log.Println("a websocket conn established")

	done := make(chan struct{})

	go func() {
		defer close(done)
		for {
			_, message, err := conn.ReadMessage()
			if err != nil {
				log.Println("read:", err)
				return
			}
			log.Printf("recv: %s", message)
		}
	}()

	ticker := time.NewTicker(time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-done:
			return
		case t := <-ticker.C:
			msg := msg{
				Action: "message",
				Msg:    t.String(),
			}
			rawMsg, err := json.Marshal(msg)
			if err != nil {
				log.Println("marshal:", err)
				return
			}
			if err := conn.WriteMessage(websocket.TextMessage, rawMsg); err != nil {
				log.Println("write:", err)
				return
			}
		}
	}
}
