package main

import (
	"chat-application-code-school/lib"
	"flag"
	"log"
	"os"
)

func main() {
	args := os.Args

	if len(args) < 2 {
		log.Fatal("You should pass an IP address and an optional listen flag if you want to be a host")
	}

	var isHost bool

	flag.BoolVar(&isHost, "listen", false, "Listens on the specified IP address")
	flag.Parse()

	if isHost {
		ip := args[2]
		lib.RunHost(ip)
	} else {
		ip := args[1]
		lib.RunGuest(ip)
	}
}
