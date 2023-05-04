package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"strconv"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing an Asset
type SmartContract struct {
	contractapi.Contract
}

// Asset describes basic details of what makes up a simple asset
// Insert struct field in alphabetic order => to achieve determinism across languages
// golang keeps the order when marshal to json but doesn't order automatically
type Asset struct {
	ID          string `json: "id"`
	Name        string `json: "name"`
	TypeID      string `json: "type_id"`
	Weight      int    `json: "weight"`
	ArrivalTime string `json: "arrival_time"`
	Timestamp   string `json: "timestamp"`
}

// InitLedger adds a base set of assets to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	assets := []Asset{
		{ID: "asset1", Name: "blue", Weight: 5, ArrivalTime: "Tomoko", Timestamp: "300"},
		{ID: "asset2", Name: "red", Weight: 5, ArrivalTime: "Brad", Timestamp: "400"},
		{ID: "asset3", Name: "green", Weight: 10, ArrivalTime: "Jin Soo", Timestamp: "500"},
		{ID: "asset4", Name: "yellow", Weight: 10, ArrivalTime: "Max", Timestamp: "600"},
		{ID: "asset5", Name: "black", Weight: 15, ArrivalTime: "Adriana", Timestamp: "700"},
		{ID: "asset6", Name: "white", Weight: 15, ArrivalTime: "Michel", Timestamp: "800"},
	}

	for _, asset := range assets {
		assetJSON, err := json.Marshal(asset)
		if err != nil {
			return err
		}

		err = ctx.GetStub().PutState(asset.ID, assetJSON)
		if err != nil {
			return fmt.Errorf("failed to put to world state. %v", err)
		}
	}

	return nil
}

// CreateAsset issues a new asset to the world state with given details.
func (s *SmartContract) CreateAsset(ctx contractapi.TransactionContextInterface, id string, color string, size int, owner string, appraisedValue string) error {
	exists, err := s.AssetExists(ctx, id)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the asset %s already exists", id)
	}

	asset := Asset{
		ID:          id,
		Name:        color,
		Weight:      size,
		ArrivalTime: owner,
		Timestamp:   appraisedValue,
	}
	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, assetJSON)
}

// ReadAsset returns the asset stored in the world state with given id.
func (s *SmartContract) ReadAsset(ctx contractapi.TransactionContextInterface, id string) (*Asset, error) {
	assetJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if assetJSON == nil {
		return nil, fmt.Errorf("the asset %s does not exist", id)
	}

	var asset Asset
	err = json.Unmarshal(assetJSON, &asset)
	if err != nil {
		return nil, err
	}

	return &asset, nil
}

// UpdateAsset updates an existing asset in the world state with provided parameters.
func (s *SmartContract) UpdateAsset(ctx contractapi.TransactionContextInterface, id string, color string, size int, owner string, appraisedValue string) error {
	exists, err := s.AssetExists(ctx, id)
	if err != nil {
		return err
	}
	if !exists {
		return fmt.Errorf("the asset %s does not exist", id)
	}

	// overwriting original asset with new asset
	asset := Asset{
		ID:          id,
		Name:        color,
		Weight:      size,
		ArrivalTime: owner,
		Timestamp:   appraisedValue,
	}
	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, assetJSON)
}

// DeleteAsset deletes an given asset from the world state.
func (s *SmartContract) DeleteAsset(ctx contractapi.TransactionContextInterface, id string) error {
	exists, err := s.AssetExists(ctx, id)
	if err != nil {
		return err
	}
	if !exists {
		return fmt.Errorf("the asset %s does not exist", id)
	}

	return ctx.GetStub().DelState(id)
}

// AssetExists returns true when asset with given ID exists in world state
func (s *SmartContract) AssetExists(ctx contractapi.TransactionContextInterface, id string) (bool, error) {
	assetJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	return assetJSON != nil, nil
}

// TransferAsset updates the owner field of asset with given id in world state, and returns the old owner.
func (s *SmartContract) TransferAsset(ctx contractapi.TransactionContextInterface, id string, newOwner string) (string, error) {
	asset, err := s.ReadAsset(ctx, id)
	if err != nil {
		return "", err
	}

	oldOwner := asset.Name
	asset.Name = newOwner

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

// GetAllAssets returns all assets found in world state
func (s *SmartContract) GetAllAssets(ctx contractapi.TransactionContextInterface) ([]*Asset, error) {
	// range query with empty string for startKey and endKey does an
	// open-ended query of all assets in the chaincode namespace.
	resultsIterator, err := ctx.GetStub().GetStateByRange("", "")
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	var assets []*Asset
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		var asset Asset
		err = json.Unmarshal(queryResponse.Value, &asset)
		if err != nil {
			return nil, err
		}
		assets = append(assets, &asset)
	}

	return assets, nil
}

func (s *SmartContract) StoreBlock(ctx contractapi.TransactionContextInterface, name string, typeId string, weight int) (err error) {

	/*Blockchain store*/

	/*exists, err := s.AssetExists(ctx, id)

	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the asset %s already exists", id)
	}
	*/

	asset := Asset{
		ID:          "UNIQUE",
		Name:        "Guilherme O",
		Weight:      80,
		ArrivalTime: "02101999",
		Timestamp:   "time.now",
	}

	assetJSON, err := json.Marshal(asset)
	id := "id#" + strconv.Itoa(rand.Intn(1000))

	ctx.GetStub().PutState(id, assetJSON)

	/*
		assetJSONOUT, err := ctx.GetStub().GetState(id)
		fmt.Printf("mystr:\t %v \n", []byte(assetJSONOUT))

		var assetOUT models.Asset
		err = json.Unmarshal(assetJSONOUT, &assetOUT)*/

	return
}
