package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing an Asset
type SmartContract struct {
	contractapi.Contract
}

// Asset describes basic details of what makes up a simple asset
// Insert struct field in alphabetic order => to achieve determinism across languages
// golang keeps the order when marshal to json but doesn't order automatically
type Document struct {
	ID         string `json: "id"`
	Title      string `json: "name"`
	Soutien    string `json: "soutien"`
	Authors    string `json: "authors"`
	Editors    string `json: "arrival_time"`
	Multimedia string `json: "multimedia"`
	Keywords   string `json: "keywords"`
}

/*
type Person struct {
	ID       string `json: "id"`
	Name     string `json: "name"`
	CPF      string `json: "cpf"`
	Phone    string `json: "phone"`
	Login    string `json: "login"`
	Password string `json: "password"`
	Token    string `json: "token"`
}

type Asset struct {
	ID          string `json: "id"`
	Name        string `json: "name"`
	TypeID      string `json: "type_id"`
	Weight      int    `json: "weight"`
	ArrivalTime string `json: "arrival_time"`
	Timestamp   string `json: "timestamp"`
}*/

//ID da ledger = ClassName#Number

func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {

	/*people := []Person{
		{ID: "Person#0001", Name: "Guilherme", CPF: "11111111111", Phone: "61981999949",
			Login: "guilhermeoliveira.0210@gmail.com", Password: "admin", Token: "adminTOKEN"},
		{ID: "Person#0002", Name: "Edison", CPF: "11111111111", Phone: "61981999950",
			Login: "edisonishikawa@gmail.com", Password: "admin", Token: "adminTOKEN"},

	for _, person := range people {
				assetJSON, err := json.Marshal(person)
				if err != nil {
					return err
				}

				err = ctx.GetStub().PutState(person.ID, assetJSON)
				if err != nil {
					return fmt.Errorf("failed to put to world state. %v", err)
				}
			}
	}*/

	documents := []Document{
		{ID: "Document#0001", Title: "Titulo Materia 1", Soutien: "Leia a materia", Authors: "User1,User2",
			Editors: "User1,User2", Multimedia: "TEXT", Keywords: "newsletter"},
		{ID: "Document#0002", Title: "Revista Super Interessante", Soutien: "Read this", Authors: "User1,User2",
			Editors: "User1,User2", Multimedia: "TEXT", Keywords: "news"},
	}

	for _, document := range documents {
		assetJSON, err := json.Marshal(document)
		if err != nil {
			return err
		}

		err = ctx.GetStub().PutState(document.ID, assetJSON)
		if err != nil {
			return fmt.Errorf("failed to put to world state. %v", err)
		}
	}

	return nil
}

//Create person
func (s *SmartContract) CreateDocument(ctx contractapi.TransactionContextInterface, id string, title string, soutien string,
	authors string, editors string, multimedia string, keywords string) error {
	exists, err := s.DocumentExists(ctx, id)

	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the asset %s already exists", id)
	}

	document := Document{
		ID:         id,
		Title:      title,
		Soutien:    soutien,
		Authors:    authors,
		Editors:    editors,
		Multimedia: multimedia,
		Keywords:   keywords,
	}

	assetJSON, err := json.Marshal(document)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, assetJSON)
}

// ReadAsset returns the document stored in the world state with given id.
func (s *SmartContract) ReadDocument(ctx contractapi.TransactionContextInterface, id string) (*Document, error) {
	documentJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if documentJSON == nil {
		return nil, fmt.Errorf("the document %s does not exist", id)
	}

	var document Document
	err = json.Unmarshal(documentJSON, &document)
	if err != nil {
		return nil, err
	}

	return &document, nil
}

// UpdateAsset updates an existing document in the world state with provided parameters.
func (s *SmartContract) UpdateDocument(ctx contractapi.TransactionContextInterface, id string, title string, soutien string,
	authors string, editors string, multimedia string, keywords string) error {
	exists, err := s.DocumentExists(ctx, id)
	if err != nil {
		return err
	}
	if !exists {
		return fmt.Errorf("the document %s does not exist", id)
	}

	// overwriting original document with new document
	document := Document{
		ID:         id,
		Title:      title,
		Soutien:    soutien,
		Authors:    authors,
		Editors:    editors,
		Multimedia: multimedia,
		Keywords:   keywords,
	}
	documentJSON, err := json.Marshal(document)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, documentJSON)
}

// DeleteDocument deletes an given document from the world state.
func (s *SmartContract) DeleteDocument(ctx contractapi.TransactionContextInterface, id string) error {
	exists, err := s.DocumentExists(ctx, id)
	if err != nil {
		return err
	}
	if !exists {
		return fmt.Errorf("the document %s does not exist", id)
	}

	return ctx.GetStub().DelState(id)
}

// DocumentExists returns true when asset with given ID exists in world state
func (s *SmartContract) DocumentExists(ctx contractapi.TransactionContextInterface, id string) (bool, error) {
	assetJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	return assetJSON != nil, nil
}

// TransferDocument updates the owner field of asset with given id in world state, and returns the old owner.
func (s *SmartContract) TransferDocument(ctx contractapi.TransactionContextInterface, id string, newOwner string) (string, error) {
	asset, err := s.ReadDocument(ctx, id)
	if err != nil {
		return "", err
	}

	oldOwner := asset.Authors
	asset.Authors = newOwner

	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return "", err
	}

	err = ctx.GetStub().PutState(id, assetJSON)
	if err != nil {
		return "", err
	}

	return oldOwner, nil
}

// GetAllDocuments returns all assets found in world state
func (s *SmartContract) GetAllDocuments(ctx contractapi.TransactionContextInterface) ([]*Document, error) {
	// range query with empty string for startKey and endKey does an
	// open-ended query of all assets in the chaincode namespace.
	resultsIterator, err := ctx.GetStub().GetStateByRange("", "")
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	var assets []*Document
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		var asset Document
		err = json.Unmarshal(queryResponse.Value, &asset)
		if err != nil {
			return nil, err
		}
		assets = append(assets, &asset)
	}

	return assets, nil
}

func (s *SmartContract) ResetDocuments(ctx contractapi.TransactionContextInterface) ([]*Document, error) {
	// range query with empty string for startKey and endKey does an
	// open-ended query of all assets in the chaincode namespace.
	resultsIterator, err := ctx.GetStub().GetStateByRange("", "")
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	var assets []*Document
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		var asset Document
		err = json.Unmarshal(queryResponse.Value, &asset)
		if err != nil {
			return nil, err
		}

		exists, err := s.DocumentExists(ctx, asset.ID)
		if err != nil {
			return nil, err
		}

		if exists {
			s.DeleteDocument(ctx, asset.ID)
		}
		assets = append(assets, &asset)
	}

	return assets, nil
}
