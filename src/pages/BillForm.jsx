import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const billFormSchema = Yup.object().shape({
  products: Yup.array().of(
    Yup.object().shape({
      productName: Yup.string().required("Please Enter Product Name"),
      productSize: Yup.string(),
      hsn: Yup.number().required("Please Enter HSN Code"),
      productQuantity: Yup.number().required(),
      productRate: Yup.number().required(),
    })
  ),
});

const BillForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    // handleChange,
    values,
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      products: [
        {
          productName: "",
          productSize: "",
          hsn: "",
          productQuantity: "",
          productRate: "",
        },
      ],
    },
    validationSchema: billFormSchema,
    async onSubmit(values) {
      setIsSubmitting(true);
      try {
        console.log(values, "values");
      } catch (e) {
        console.log(e, "errors");
      }
      setIsSubmitting(false);
    },
  });

  const changeValue = (e, index) => {
    let data = [...values.products];
    data[index][e.currentTarget.name] = e.currentTarget.value;

    setFieldValue("products", data);
  };

  const addProduct = (e) => {
    let data = [...values.products];
    const newProduct = {
      productName: "",
      productSize: "",
      hsn: "",
      productQuantity: "",
      productRate: "",
    };
    data.push(newProduct);
    setFieldValue("products", data);
  };

  const deleteProduct = (e, index) => {
    let data = [...values.products];
    data.splice(index, 1);

    setFieldValue("products", data);
  };

  return (
    <div>
      <div>
        {isSubmitting === true ? (
          <div>Form Submitting</div>
        ) : (
          <form onSubmit={handleSubmit}>
            {values.products.map((product, index) => (
              <div key={index}>
                <div className="form-group">
                  <label htmlFor="productName">Product Name</label>
                  <input
                    name="productName"
                    type="text"
                    value={product.productName}
                    onChange={(e) => {
                      setFieldTouched("products", true);
                      changeValue(e, index);
                    }}
                  />
                  {errors.products && touched.products&& ({errors.products})}
                  {/* {errors.products && touched.products && (
                    <span>{errors.products}</span>
                  )} */}
                </div>
                <div className="form-group">
                  <label htmlFor="productSize">Product Size</label>
                  <input
                    name="productSize"
                    type="text"
                    value={product.productSize}
                    onChange={(e) => {
                      setFieldTouched("products", true);
                      changeValue(e, index);
                    }}
                  />
                  {/* {errors.products && touched.products && (
                    <span>{errors.products}</span>
                  )} */}
                </div>
                <div className="form-group">
                  <label htmlFor="hsn">HSN</label>
                  <input
                    name="hsn"
                    type="text"
                    value={product.hsn}
                    onChange={(e) => {
                      setFieldTouched("products", true);
                      changeValue(e, index);
                    }}
                  />
                  {/* {errors.products && touched.products && <span>{errors.products}</span>} */}
                </div>
                <div className="form-group">
                  <label htmlFor="productQuantity">Product Quantity</label>
                  <input
                    name="productQuantity"
                    type="text"
                    value={product.productQuantity}
                    onChange={(e) => {
                      setFieldTouched("products", true);
                      changeValue(e, index);
                    }}
                  />
                  {/* {errors.products && touched.products && (
                    <span>{errors.products}</span>
                  )} */}
                </div>
                <div className="form-group">
                  <label htmlFor="productRate">Product Rate</label>
                  <input
                    name="productRate"
                    type="text"
                    value={product.productRate}
                    onChange={(e) => {
                      setFieldTouched("products", true);
                      changeValue(e, index);
                    }}
                  />
                  {/* {errors.products && touched.products && (
                    <span>{errors.products}</span>
                  )} */}
                </div>
                <div className="form-group">
                  <button
                    onClick={(e) => {
                      deleteProduct(e, index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div className="form-group">
              <button type="submit">Submit</button>
            </div>
            <div className="form-group">
              <button
                onClick={(e) => {
                  addProduct(e);
                }}
              >
                Add
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BillForm;
