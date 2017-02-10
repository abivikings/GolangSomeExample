package main

import (
    "fmt"
)


// this is my function
// here x y is argument and another int is return type 

func add(x int, y int) (p,q int) {
    a := x + y
    b := 34 * 34
    return a,b
}

// this is a main function

func main()  {
    fmt.Println(add(23,34))    
}