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
	defer listener.Close()

	fmt.Println("Listening on", ipAndPort)

	conn, acceptErr := listener.Accept()
	printError(acceptErr)

	fmt.Println("New connection accepted")

	reader := bufio.NewReader(conn)
	replyReader := bufio.NewReader(os.Stdin)

	for {
		handleHost(conn, reader, replyReader)
	}
}

func handleHost(conn net.Conn, reader, replyReader *bufio.Reader) {

	message, readErr := reader.ReadString('\n')
	printError(readErr)

	fmt.Println("Message received:", message)

	fmt.Print("Send message: ")

	replyMessage, replyErr := replyReader.ReadString('\n')
	printError(replyErr)

	fmt.Fprint(conn, replyMessage)
}

// RunGuest receives an IP address as argument
// and connects with that IP
func RunGuest(ip string) {
	ipAndPort := ip + port

	conn, dialErr := net.Dial("tcp", ipAndPort)
	printError(dialErr)
	defer conn.Close()

	reader := bufio.NewReader(conn)
	replyReader := bufio.NewReader(os.Stdin)

	for {
		handleGuest(conn, reader, replyReader)
	}
}

func handleGuest(conn net.Conn, reader, replyReader *bufio.Reader) {
	fmt.Print("Send message: ")

	replyMessage, replyErr := replyReader.ReadString('\n')
	printError(replyErr)

	fmt.Fprint(conn, replyMessage)

	message, readErr := reader.ReadString('\n')
	printError(readErr)

	fmt.Println("Message received:", message)
}

func printError(err error) {
	if err != nil {
		log.Fatal("Error:", err)
	} else {
		return
	}
}
