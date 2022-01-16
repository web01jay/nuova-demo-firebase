import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const billFormSchema = Yup.object().shape({
    productName: Yup.string().required("Please Enter Product Name"),
    productSize: Yup.string(),
    hsn: Yup.number().required("Please Enter HSN Code"),
    productQuantity: Yup.number().required(),
    productRate: Yup.number().required()
})

const BillForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        setFieldTouched,
      } = useFormik({
        initialValues: {
            productName: "",
            productSize: "",
            hsn: "",
            productQuantity: "",
            productRate: "",
        },
        validationSchema: billFormSchema,
        async onSubmit(values){
            setIsSubmitting(true)
            try{
                console.log(values, "values")
            } catch(e){
                console.log(e, "errors")
            }
            setIsSubmitting(false)
        }
      })

    return (
        <div>
            <div>
                {isSubmitting === true ? (
                    <div>Form Submitting</div>
                ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="productName">Product Name</label>
                        <input name="productName" type="text" value={values.productName} 
                        onChange={(e)=>{
                            setFieldTouched("productName", true)
                            handleChange(e)
                        }} />
                        {errors.productName && touched.productName && <span>{errors.productName}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="productSize">Product Size</label>
                        <input name="productSize" type="text" value={values.productSize} onChange={(e)=>{
                            setFieldTouched("productSize", true)
                            handleChange(e)
                        }} />
                        {errors.productSize && touched.productSize && <span>{errors.productSize}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="hsn">HSN</label>
                        <input name="hsn" type="text" value={values.hsn} onChange={(e)=>{
                            setFieldTouched("hsn", true)
                            handleChange(e)
                        }} />
                        {errors.hsn && touched.hsn && <span>{errors.hsn}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="productQuantity">Product Quantity</label>
                        <input name="productQuantity" type="text" value={values.productQuantity} onChange={(e)=>{
                            setFieldTouched("productQuantity", true)
                            handleChange(e)
                        }} />
                        {errors.productQuantity && touched.productQuantity && <span>{errors.productQuantity}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="productRate">Product Rate</label>
                        <input name="productRate" type="text" value={values.productRate} onChange={(e)=>{
                            setFieldTouched("productRate", true)
                            handleChange(e)
                        }} />
                        {errors.productRate && touched.productRate && <span>{errors.productRate}</span>}
                    </div>
                    <div className="form-group">
                        <button type="submit">Submit</button>
                    </div>
                </form>
                )}
            </div>
        </div>
    )
}

export default BillForm
