package main

import (
	"fmt"
	"os"
	"strings"
)

func print(statistics map[string]int) {
	fmt.Println("Number of words started with each letter:")

	for letter, count := range statistics {
		fmt.Printf("%s = %d\n", letter, count)
	}
}

func getStatistics(words []string) map[string]int {
	statistics := make(map[string]int)

	for _, word := range words {
		firstLetter := strings.ToUpper(string(word[0]))

		count, didFound := statistics[firstLetter]

		if didFound {
			statistics[firstLetter] = count + 1
		} else {
			statistics[firstLetter] = 1
		}
	}

	return statistics
}

func main() {
	words := os.Args[1:]

	statistics := getStatistics(words)

	print(statistics)
}
