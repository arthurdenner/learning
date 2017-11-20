package main

import (
	"chat-application-code-school/lib"
	"flag"
	"log"
	"os"
)

func main() {
	if len(os.Args) < 2 {
		log.Fatal("You should pass an IP address and an optional listen flag if you want to be a host")
	}

	var isHost bool

	flag.BoolVar(&isHost, "listen", false, "Listens on the specified IP address")
	flag.Parse()
	args := flag.Args()
	ip := args[0]

	if isHost {
		lib.RunHost(ip)
	} else {
		lib.RunGuest(ip)
	}
}
