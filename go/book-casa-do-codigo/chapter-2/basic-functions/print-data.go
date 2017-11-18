package printData

import "fmt"

func printData(name string, age int) {
	fmt.Printf("%s has %d years old.\n", name, age)
}

func main() {
	printData("Arthur", 22)
}
