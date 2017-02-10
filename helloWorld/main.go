package main

import (
    "fmt"
)

func main()  {
    // assign a map in age 
    // map is a key value pair
    // here string is datatype of key and int is datatype of value 
    age := make(map[string]int)

    // add data in map 

    age["hasan"] = 23
    age["kamal"] = 32

    // displa map data
    fmt.Println(age)

    // get length

    fmt.Println(len(age))
}