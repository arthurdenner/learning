package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	if len(os.Args) < 3 {
		fmt.Println("You should pass [values] and \"unit\".")
		os.Exit(1)
	}

	originalUnit := os.Args[len(os.Args)-1]
	originalValues := os.Args[1 : len(os.Args)-1]

	var finalUnit string

	if originalUnit == "celsius" {
		finalUnit = "fahrenheit"
	} else if originalUnit == "km" {
		finalUnit = "miles"
	} else {
		fmt.Printf("%s isn't a known unit!\n", originalUnit)
		os.Exit(1)
	}

	for i, v := range originalValues {
		originalValue, err := strconv.ParseFloat(v, 64)

		if err != nil {
			fmt.Printf(
				"The value %s in the position %d isn't a valid number!\n",
				v, i,
			)
			os.Exit(1)
		}

		var finalValue float64

		if originalUnit == "celsius" {
			finalValue = originalValue*1.8 + 32
		} else {
			finalValue = originalValue / 1.60934
		}

		fmt.Printf(
			"%.2f %s = %.2f %s\n",
			originalValue, originalUnit,
			finalValue, finalUnit,
		)
	}
}
