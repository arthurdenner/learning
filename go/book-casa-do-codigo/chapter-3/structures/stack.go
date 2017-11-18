package main

import (
	"errors"
	"fmt"
)

func main() {
	stack := Stack{}
	print := fmt.Println

	print("Initial size:", stack.Size())
	print("Is stack empty?", stack.IsEmpty())

	stack.Pile("Go")
	stack.Pile(2017)
	stack.Pile(1.69)
	stack.Pile("The end")

	print("Size after stack 4 elements:", stack.Size())
	print("Is stack empty?", stack.IsEmpty())

	for !stack.IsEmpty() {
		value, _ := stack.Unpile()

		print("Removing", value)
		print("Actual size:", stack.Size())
		print("Is stack empty?", stack.IsEmpty())
	}

	_, err := stack.Unpile()

	if err != nil {
		print("Error: ", err)
	}
}

// Stack : describes a struct where elements can be stacked and unstacked
type Stack struct {
	values []interface{}
}

// Size : check the size of a stack
func (stack Stack) Size() int {
	return len(stack.values)
}

// IsEmpty : check if a stack is empty
func (stack Stack) IsEmpty() bool {
	return stack.Size() == 0
}

// Pile : stacks an element
func (stack *Stack) Pile(value interface{}) {
	stack.values = append(stack.values, value)
}

// Unpile : unstack an element
func (stack *Stack) Unpile() (interface{}, error) {
	if stack.IsEmpty() {
		err := errors.New("The stack is empty")

		return nil, err
	}

	lastIndex := stack.Size() - 1

	value := stack.values[lastIndex]

	stack.values = stack.values[:lastIndex]

	return value, nil
}
