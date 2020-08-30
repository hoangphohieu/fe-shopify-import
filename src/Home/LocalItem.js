import React, { useState } from 'react';
import _ from "lodash";
function LocalItem(props) {
      const [MockData, setMockData] = useState({
            "Handle": "",
            "Title": "",
            "Body (HTML)": "",
            "Vendor": "",
            "Type": "",
            "Tags": "",
            "Published": "",
            "Option1 Name": "",
            "Option1 Value": "",
            "Option2 Name": "",
            "Option2 Value": "",
            "Option3 Name": "",
            "Option3 Value": "",
            "Variant SKU": "",
            "Variant Grams": "",
            "Variant Inventory Tracker": "",
            "Variant Inventory Qty": null,
            "Variant Inventory Policy": "deny",
            "Variant Fulfillment Service": "manual",
            "Variant Price": "",
            "Variant Compare At Price": "",
            "Variant Requires Shipping": "TRUE",
            "Variant Taxable": "TRUE",
            "Variant Barcode": "",
            "Image Src": "",
            "Image Position": "",
            "Image Alt Text": "",
            "Gift Card": "FALSE",
            "SEO Title": "",
            "SEO Description": "",
            "Google Shopping / Google Product Category": "",
            "Google Shopping / Gender": "",
            "Google Shopping / Age Group": "",
            "Google Shopping / MPN": "",
            "Google Shopping / AdWords Grouping": "",
            "Google Shopping / AdWords Labels": "",
            "Google Shopping / Condition": "",
            "Google Shopping / Custom Product": "",
            "Google Shopping / Custom Label 0": "",
            "Google Shopping / Custom Label 1": "",
            "Google Shopping / Custom Label 2": "",
            "Google Shopping / Custom Label 3": "",
            "Google Shopping / Custom Label 4": "",
            "Variant Image": "",
            "Variant Weight Unit": "",
            "Variant Tax Code": "",
            "Cost per item": ""
      });
      const [MockVariant, setMockVariant] = useState({
            productName: "",
            Option1Name: "",
            Option2Name: "",
            Option3Name: "",
            list: []
      });
      if (localStorage.product === undefined) localStorage.product = JSON.stringify([]);
      // console.log(MockVariant);
      let changeVariant = (param, key, value) => {
            let list = MockVariant.list;
            list[key][param] = value;
            setMockVariant({ ...MockVariant, list: [...list] });
      }
      let listOption = ['NameDrive', 'Option1Value', 'Option2Value', 'Option3Value', 'VariantPrice', 'VariantCompareAtPrice', 'VariantInventoryQty', 'VariantSKU']

      let addVariant = () => {
            setMockVariant({
                  ...MockVariant, list: [...MockVariant.list, {
                        NameDrive: "",
                        Option1Value: "",
                        Option2Value: "",
                        Option3Value: "",
                        VariantPrice: "",
                        VariantCompareAtPrice: "",
                        VariantInventoryQty: "",
                        VariantSKU: ""
                  }]
            });
      }
      let addProduct = () => {
            let data = { ...MockData };
            data["Handle"] = _.kebabCase(data["Title"]) + "-";
            data["Option1 Name"] = MockVariant.Option1Name;
            data["Option2 Name"] = MockVariant.Option2Name;
            data["Option3 Name"] = MockVariant.Option3Name;

            let listVariant = MockVariant.list.filter(item => (item.NameDrive !== ""
                  | item.Option1Value !== ""
                  | item.Option2Value !== ""
                  | item.Option3Value !== ""
                  | item.VariantPrice !== ""
                  | item.VariantCompareAtPrice !== ""
                  | item.VariantInventoryQty !== ""
                  | item.VariantSKU !== ""
            ))
            let product = JSON.parse(localStorage.product);
            product = [...product, {
                  productName: MockVariant.productName,
                  mockData: data,
                  listVariant: listVariant

            }]
            localStorage.product = JSON.stringify(product)
      }
      return (
            <div>
                  <div className="modal">
                        <input type="text"
                              onChange={(e) => setMockVariant({ ...MockVariant, productName: e.target.value })}
                              value={MockVariant.productName}
                              placeholder="product Name"
                        />

                        <div className="catdat_tongquat">
                              <p>cài đặt tổng quát 1 sản phẩm</p>

                              {/* <div className="one-pro">
                                    <span>Handle (tên link sp duy nhất)</span>
                                    <input type="text"
                                          onChange={(e) => setMockData({ ...MockData, Handle: e.target.value })}
                                          value={MockData.Handle}
                                    />
                              </div> */}

                              <div className="one-pro">
                                    <span>Title ()</span>
                                    <input type="text"
                                          onChange={(e) => setMockData({ ...MockData, Title: e.target.value })}
                                          value={MockData.Title}
                                    />
                              </div>

                              <div className="one-pro">
                                    <span>Body (HTML)</span>
                                    <input type="text"
                                          onChange={(e) => setMockData({ ...MockData, "Body (HTML)": e.target.value })}
                                          value={MockData["Body (HTML)"]}
                                    />
                              </div>

                              <div className="one-pro">
                                    <span>Vendor (nhà cung cấp)</span>
                                    <input type="text"
                                          onChange={(e) => setMockData({ ...MockData, Vendor: e.target.value })}
                                          value={MockData.Vendor}
                                    />
                              </div>

                              <div className="one-pro">
                                    <span>Type (loại sản phẩm: phonecase,...)</span>
                                    <input type="text"
                                          onChange={(e) => setMockData({ ...MockData, Type: e.target.value })}
                                          value={MockData.Type}
                                    />
                              </div>

                              <div className="one-pro">
                                    <span>Tags (tag sản phẩm, ngăn cách bởi dấu phẩy)</span>
                                    <input type="text"
                                          onChange={(e) => setMockData({ ...MockData, Tags: e.target.value })}
                                          value={MockData.Tags}
                                    />
                              </div>

                              <div className="one-pro">
                                    <span>Variant Grams (cân nặng sản phẩm)</span>
                                    <input type="text"
                                          onChange={(e) => setMockData({ ...MockData, "Variant Grams": e.target.value })}
                                          value={MockData["Variant Grams"]}
                                    />
                              </div>

                              <div className="one-pro">
                                    <span>Variant Inventory Qty (lượng hàng trong kho)</span>
                                    <input type="text"
                                          onChange={(e) => setMockData({ ...MockData, "Variant Inventory Qty": e.target.value })}
                                          value={MockData["Variant Inventory Qty"]}
                                    />
                              </div>

                              <div className="one-pro">
                                    <span>Variant Inventory Policy (deny: hết kho thì thôi, continue hết kho vẫn bán)</span>
                                    <select id="Variant_Inventory_Policy" onChange={(e) => setMockData({ ...MockData, "Variant Inventory Policy": e.target.value })}>
                                          <option value="deny">deny</option>
                                          <option value="continue">continue</option>
                                    </select>
                              </div>

                              <div className="one-pro">
                                    <span>Variant Price (giá thật sự)</span>
                                    <input type="text"
                                          onChange={(e) => setMockData({ ...MockData, "Variant Price": e.target.value })}
                                          value={MockData["Variant Price"]}
                                    />
                              </div>

                              <div className="one-pro">
                                    <span>Variant Compare At Price (giá ảo)</span>
                                    <input type="text"
                                          onChange={(e) => setMockData({ ...MockData, "Variant Compare At Price": e.target.value })}
                                          value={MockData["Variant Compare At Price"]}
                                    />
                              </div>


                              <div className="one-pro">
                                    <span>Variant Weight Unit (đơn vị cân nặng)</span>
                                    <select id="Variant_Weight_Unit" onChange={(e) => setMockData({ ...MockData, "Variant Weight Unit": e.target.value })} >
                                          <option value="g">g</option>
                                          <option value="kg">kg</option>
                                          <option value="lb">lb</option>
                                          <option value="oz">oz</option>
                                    </select>
                              </div>

                              {/* <div className="one-pro">
                              <span>Handle</span>
                              <select id="cars" onChange={(e) => console.log(e.target)}>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                              </select>
                        </div> */}

                        </div>

                        <div className="caidat_bienthe">
                              <table className="">

                                    {/* <div className="one-pro">
                                    <span>Handle (tên link sp duy nhất)</span>
                                    <input type="text"
                                          onChange={(e) => setMockData({ ...MockData, Handle: e.target.value })}
                                          value={MockData.Handle}
                                    />
                              </div> */}
                                    <thead>
                                          <tr>
                                                <th scope="col">NameDrive</th>
                                                <th scope="col">
                                                      <input type="text"
                                                            onChange={(e) => setMockVariant({ ...MockVariant, Option1Name: e.target.value })}
                                                            value={MockVariant.Option1Name}
                                                            placeholder="option1 name"
                                                      />
                                                </th>
                                                <th scope="col">
                                                      <input type="text"
                                                            onChange={(e) => setMockVariant({ ...MockVariant, Option2Name: e.target.value })}
                                                            value={MockVariant.Option2Name}
                                                            placeholder="option2 name"
                                                      />
                                                </th>
                                                <th scope="col">
                                                      <input type="text"
                                                            onChange={(e) => setMockVariant({ ...MockVariant, Option3Name: e.target.value })}
                                                            value={MockVariant.Option3Name}
                                                            placeholder="option3 name"
                                                      />
                                                </th>
                                                <th scope="col">giá thật</th>
                                                <th scope="col">giá ảo</th>
                                                <th scope="col">kho</th>
                                                <th scope="col">sku</th>
                                          </tr>
                                    </thead>
                                    <tbody>



                                          {MockVariant.list.map((item, key) => <tr key={key}>
                                                {listOption.map((itemListOption, key2) => <td key={key2}>
                                                      <input type="text"
                                                            onChange={(e) => changeVariant(itemListOption, key, e.target.value)}
                                                            value={item[itemListOption]}
                                                      />
                                                </td>)}


                                          </tr>)}


                                    </tbody>
                              </table>
                        </div>

                        <div className="add_variant" onClick={addVariant}>
                              add Variant
                        </div>
                        <div onClick={addProduct}>
                              Lưu Sản phẩm
                  </div>
                  </div>


            </div >
      );
}

export default LocalItem;