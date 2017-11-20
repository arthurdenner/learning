package lib

import (
	"bufio"
	"fmt"
	"log"
	"net"
	"os"
)

const port = ":8080"

// RunHost receives an IP as argument
// and listens to connections on that IP
func RunHost(ip string) {
	ipAndPort := ip + port

	listener, listenErr := net.Listen("tcp", ipAndPort)
	printError(listenErr)

	fmt.Println("Listening on", ipAndPort)

	conn, acceptErr := listener.Accept()
	printError(acceptErr)

	fmt.Println("New connection accepted")

	for {
		handleHost(conn)
	}
}

func handleHost(conn net.Conn) {
	createMessageBuffer(conn)

	fmt.Print("Send message: ")

	createReplyBuffer(conn)
}

// RunGuest receives an IP address as argument
// and connects with that IP
func RunGuest(ip string) {
	ipAndPort := ip + port

	conn, dialErr := net.Dial("tcp", ipAndPort)
	printError(dialErr)

	for {
		handleGuest(conn)
	}
}

func handleGuest(conn net.Conn) {
	fmt.Print("Send message: ")

	createReplyBuffer(conn)

	createMessageBuffer(conn)
}

func createMessageBuffer(conn net.Conn) {
	reader := bufio.NewReader(conn)

	message, readErr := reader.ReadString('\n')
	printError(readErr)

	fmt.Println("Message received:", message)
}

func createReplyBuffer(conn net.Conn) {
	replyReader := bufio.NewReader(os.Stdin)

	replyMessage, replyErr := replyReader.ReadString('\n')
	printError(replyErr)

	fmt.Fprint(conn, replyMessage)
}

func printError(err error) {
	if err != nil {
		log.Fatal("Error:", err)
	} else {
		return
	}
}
