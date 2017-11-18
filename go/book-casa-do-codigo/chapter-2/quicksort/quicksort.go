package main

import (
	"fmt"
	"os"
	"strconv"
)

func splitNumbers(numbers []int, ref int) (lessThanRef, moreThanRef []int) {
	for _, n := range numbers {
		if n <= ref {
			lessThanRef = append(lessThanRef, n)
		} else {
			moreThanRef = append(moreThanRef, n)
		}
	}

	return lessThanRef, moreThanRef
}

func quicksort(numbers []int) []int {
	if len(numbers) <= 1 {
		return numbers
	}

	n := make([]int, len(numbers))
	copy(n, numbers)

	indiceRef := len(n) / 2
	ref := n[indiceRef]

	n = append(n[:indiceRef], n[indiceRef+1:]...)

	lessThanRef, moreThanRef := splitNumbers(n, ref)

	return append(
		append(quicksort(lessThanRef), ref),
		quicksort(moreThanRef)...,
	)
}

func main() {
	if len(os.Args) == 1 {
		fmt.Println("You should pass [numbers].")
		os.Exit(1)
	}

	entry := os.Args[1:]
	numbers := make([]int, len(entry))

	for i, n := range entry {
		number, err := strconv.Atoi(n)

		if err != nil {
			fmt.Printf("%s isn't a valid number!\n", n)
			os.Exit(1)
		}

		numbers[i] = number
	}

	fmt.Println(quicksort(numbers))
}
