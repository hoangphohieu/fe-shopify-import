import React, { useState, useEffect } from 'react';
import _ from "lodash";
function LocalItem(props) {
      // console.log(props);

      const [MockData, setMockData] = useState(props.mockData);
      const [MockVariant, setMockVariant] = useState({
            productName: props.name,
            Option1Name: (props.mockData) ? props.mockData["Option1 Name"] : "",
            Option2Name: (props.mockData) ? props.mockData["Option2 Name"] : "",
            Option3Name: (props.mockData) ? props.mockData["Option3 Name"] : "",
            list: props.list
      });
      let product = props.Product;

      // if (localStorage.product === undefined) localStorage.product = JSON.stringify([]);
      let renderLocal = "";
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
      let addProduct = (product) => {

            let data = { ...MockData };
            // data["Handle"] = _.kebabCase(data["Title"]) + "-";
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

            let proFilter = product.filter(item => item.productName === MockVariant.productName);
            if (proFilter.length === 1) {
                  for (let i = 0; i < product.length; i++) {
                        if (product[i].productName === MockVariant.productName)
                              product[i] = {
                                    productName: MockVariant.productName,
                                    mockData: data,
                                    listVariant: listVariant
                              }
                  }
            }
            else {
                  product = [...product, {
                        productName: MockVariant.productName,
                        mockData: data,
                        listVariant: listVariant
                  }]
            }

            fetch("http://157.230.244.57:7000/shopifyItem", {
                  method: "PUT",
                  headers: {
                        'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                        "item_post": {
                              items: product,
                              id: "shopifyItem",
                        }
                  })
            })
                  .then(response => response.json())
                  .then(res => {
                        window.location.reload(true);
                  })
                  .catch(err => {
                        window.location.reload(true);
                  })

            // localStorage.product = JSON.stringify(product);
            // them add product vao do
            // window.location.reload(true);

      }
      let deleteProduct = () => {
            let product = props.Product.map(item => {
                  if (item.productName === MockVariant.productName)
                        return null
                  else return item
            });
            console.log(product);
            product = product.filter(item => item !== null);

            fetch("http://157.230.244.57:7000/shopifyItem", {
                  method: "PUT",
                  headers: {
                        'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                        "item_post": {
                              items: product,
                              id: "shopifyItem",
                        }
                  })
            })
                  .then(response => response.json())
                  .then(res => {
                        window.location.reload(true);
                  })
                  .catch(err => {
                        window.location.reload(true);
                  })

            // localStorage.product = JSON.stringify(product);
            // them delete product
            // window.location.reload(true);
      }
      console.log(product);
      if (props.mockData !== undefined) renderLocal = <div className="modal-app">

            <div className="catdat_tongquat mt-5">
                  <div className="one-pro">
                        <span>product Name</span>
                        <input type="text"
                              onChange={(e) => setMockVariant({ ...MockVariant, productName: e.target.value })}
                              value={MockVariant.productName}
                              placeholder="product Name"
                        />
                  </div>

                  {/* <div className="one-pro">
                        <span>Title ()</span>
                        <input type="text"
                              onChange={(e) => setMockData({ ...MockData, Title: e.target.value })}
                              value={MockData.Title}
                        />
                  </div> */}
                  <div className="one-pro">
                        <span>Body (HTML)</span>
                        <input type="text"
                              onChange={(e) => setMockData({ ...MockData, "Body (HTML)": (e.target.value).split(",").join("&#44;").split('"').join("") })}
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
            </div>

            <div className="caidat_bienthe">
                  <table className="">
                        <thead>
                              <tr>
                                    <td >NameDrive</td>
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
                                    <td >giá thật</td>
                                    <td >giá ảo</td>
                                    <td >kho</td>
                                    <td >sku</td>
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

            <button className="add_variant mt-3" onClick={addVariant}>
                  add Variant
                    </button>
            <br />
            <button onClick={() => addProduct(product)} className="mt-5 mr-2">
                  Lưu Sản phẩm
                   </button>
            <button onClick={deleteProduct}>
                  xóa sản phẩm
                   </button>
      </div>



      return (
            <React.Fragment>
                  {renderLocal}
            </React.Fragment>
      );
}

export default LocalItem;





// {
//       "Handle": "",
//       "Title": "",
//       "Body (HTML)": "",
//       "Vendor": "",
//       "Type": "",
//       "Tags": "",
//       "Published": "",
//       "Option1 Name": "",
//       "Option1 Value": "",
//       "Option2 Name": "",
//       "Option2 Value": "",
//       "Option3 Name": "",
//       "Option3 Value": "",
//       "Variant SKU": "",
//       "Variant Grams": "",
//       "Variant Inventory Tracker": "",
//       "Variant Inventory Qty": null,
//       "Variant Inventory Policy": "deny",
//       "Variant Fulfillment Service": "manual",
//       "Variant Price": "",
//       "Variant Compare At Price": "",
//       "Variant Requires Shipping": "TRUE",
//       "Variant Taxable": "TRUE",
//       "Variant Barcode": "",
//       "Image Src": "",
//       "Image Position": "",
//       "Image Alt Text": "",
//       "Gift Card": "FALSE",
//       "SEO Title": "",
//       "SEO Description": "",
//       "Google Shopping / Google Product Category": "",
//       "Google Shopping / Gender": "",
//       "Google Shopping / Age Group": "",
//       "Google Shopping / MPN": "",
//       "Google Shopping / AdWords Grouping": "",
//       "Google Shopping / AdWords Labels": "",
//       "Google Shopping / Condition": "",
//       "Google Shopping / Custom Product": "",
//       "Google Shopping / Custom Label 0": "",
//       "Google Shopping / Custom Label 1": "",
//       "Google Shopping / Custom Label 2": "",
//       "Google Shopping / Custom Label 3": "",
//       "Google Shopping / Custom Label 4": "",
//       "Variant Image": "",
//       "Variant Weight Unit": "",
//       "Variant Tax Code": "",
//       "Cost per item": ""
// }