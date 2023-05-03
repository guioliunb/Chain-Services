package rawresources

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"strconv"
	"time"

	"github.com/guioliunb/Chain-Services/back-end/models"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
	contractapi.Contract
}

type TransactionContextInterface struct {
	contractapi.TransactionContextInterface
}

func Store(name string, typeId string, weight int, arrivalTime *time.Time) (rawresource *models.RawResource, err error) {

	rawresource, err = models.NewRawResourceDuo(name, typeId, weight)

	if err != nil {
		return
	}

	mockRawResources = append(mockRawResources, *rawresource)
	/*s.StoreBlock("", name, typeId, weight)*/
	return

}

func (s *SmartContract) StoreBlock(ctx contractapi.TransactionContextInterface, name string, typeId string, weight int) (rawresource *models.RawResource, err error) {

	/*Blockchain store*/

	/*exists, err := s.AssetExists(ctx, id)

	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the asset %s already exists", id)
	}
	*/

	asset := models.Asset{
		ID:             "UNIQUE",
		Color:          "color",
		Size:           15,
		Owner:          "owner",
		AppraisedValue: 15,
	}

	assetJSON, err := json.Marshal(asset)
	id := "id#" + strconv.Itoa(rand.Intn(1000))

	ctx.GetStub().PutState(id, assetJSON)

	assetJSONOUT, err := ctx.GetStub().GetState(id)
	fmt.Printf("mystr:\t %v \n", []byte(assetJSONOUT))
	/*var assetOUT models.Asset
	err = json.Unmarshal(assetJSONOUT, &assetOUT)*/

	return
}

func (s *SmartContract) AssetExists(ctx contractapi.TransactionContextInterface, id string) (bool, error) {
	assetJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	return assetJSON != nil, nil
}

func (s *SmartContract) CreateAsset(ctx contractapi.TransactionContextInterface, id string, color string, size int, owner string, appraisedValue int) error {
	exists, err := s.AssetExists(ctx, id)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the asset %s already exists", id)
	}

	asset := models.Asset{
		ID:             id,
		Color:          color,
		Size:           size,
		Owner:          owner,
		AppraisedValue: appraisedValue,
	}
	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, assetJSON)
}
