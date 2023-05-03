package main

import (
	"fmt"

	"github.com/guioliunb/Chain-Services/back-end/models"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

func main() {

	/*s := server.NewServer()
	if err := s.Init(6000); err != nil {
		panic(err)
	}
	s.Start()*/

	simpleContract := new(models.SmartContract)

	cc, err := contractapi.NewChaincode(simpleContract)

	if err != nil {
		panic(err.Error())
	}

	if err := cc.Start(); err != nil {
		panic(err.Error())
	}

	fmt.Println(cc)

}
