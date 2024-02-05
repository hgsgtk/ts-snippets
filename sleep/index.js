const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

async function main() {
    await sleep(360);
}

main()
