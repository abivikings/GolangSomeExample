package main

import (
	"fmt"
	"github.com/koding/kite"
)

func main() {
	k := kite.New("math", "1.0.0")
	k.Config.Port = 3636

	k.HandleFunc("square", func(r *kite.Request) (interface{}, error) {
		a := r.Args.One().MustFloat64()
		result := a * a
		return result, nil
	}).DisableAuthentication()

	k.HandleFunc("add", func(r *kite.Request) (interface{}, error) {
		a := r.Args.One().MustSlice()
		sum := 0.0
		for _, v := range a {
			sum += sum + v.MustFloat64()
		}
		return sum, nil
	}).DisableAuthentication()

	k.HandleFunc("stringArray", func(r *kite.Request) (interface{}, error) {
		a := r.Args.One().MustSlice()
		c_string := ""
		for _, v := range a {
			c_string += v.MustString() + "\n"
		}
		return c_string, nil
	}).DisableAuthentication()

	k.HandleFunc("map", func(r *kite.Request) (interface{}, error) {
		a := r.Args.One().MustMap()
		key := ""
		value := ""
		data := make(map[string]string)
		for k, v := range a {
			key = k
			value = v.MustString()
			data[key] = value
			fmt.Println(value)
		}
		return data, nil
	}).DisableAuthentication()

	k.Run()
}
