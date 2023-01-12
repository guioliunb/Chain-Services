package main

import "github.com/guioliunb/Chain-Services/back-end/server"


func main(){

	s := server.NewServer()
	if err := s.Init(8080); err != nil{
		panic(err)
	}

	s.Start()
}