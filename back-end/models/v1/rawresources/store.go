package rawresources

import (
	"time"

	"github.com/guioliunb/Chain-Services/back-end/models"
)

func Store(name string, typeId string, weight int, arrivalTime *time.Time) (rawresource *models.RawResource, err error) {

	rawresource, err = models.NewRawResourceDuo(name, typeId, weight)

	if err != nil {
		return
	}

	mockRawResources = append(mockRawResources, *rawresource)
	/*s.StoreBlock("", name, typeId, weight)*/
	return

}

/*
func (s *SmartContract) StoreBlock(ctx contractapi.TransactionContextInterface, name string, typeId string, weight int) (rawresource *models.RawResource, err error) {



	exists, err := s.AssetExists(ctx, id)

	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the asset %s already exists", id)
	}


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
	var assetOUT models.Asset
	err = json.Unmarshal(assetJSONOUT, &assetOUT)

	return
}
*/
