package main

import (
	"log"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

/*
func main() {

	s := server.NewServer()
	if err := s.Init(6000); err != nil {
		panic(err)
	}
	s.Start()

	simpleContract := new(SmartContract)

	cc, err := contractapi.NewChaincode(simpleContract)

	if err != nil {
		panic(err.Error())
	}

	if err := cc.Start(); err != nil {
		panic(err.Error())
	}

	fmt.Println(cc)

}*/

func main() {
	assetChaincode, err := contractapi.NewChaincode(&SmartContract{})
	if err != nil {
		log.Panicf("Error creating asset-transfer-basic chaincode: %v", err)
	}

	if err := assetChaincode.Start(); err != nil {
		log.Panicf("Error starting asset-transfer-basic chaincode: %v", err)
	}
}
