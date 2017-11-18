package sum

import "fmt"

func soma(m, n int) int {
	return m + n
}

func main() {
	s := soma(3, 5)

	fmt.Println("A soma é:", s)
}
