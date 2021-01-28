import {useForm, Controller} from "react-hook-form";
import Select from "react-select"
import {useState} from "react";
import {getCountriesLabels} from "../../DataManager";
import {Button} from "semantic-ui-react";

export default function PostType ({onSubmit, error, country}) {
    const options = getCountriesLabels().map(country => {
        return {
            value: country.code,
            label: country.name
        }
    })
    const {register, handleSubmit, formState, errors, control } = useForm();
    const {isSubmitting} = formState
    return(
            <div className="container">
                <h1 className="text-center text-light"> Create a post</h1>
                <div className="row d-flex justify-content-center   ">
            <form id="form-post" className="col-12 col-md-8 col-lg-6" onSubmit={handleSubmit(onSubmit)}>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input className={errors.title ? "form-control is-invalid " : "form-control "} type="text" id="title" ref={register({required: 'Title is required'})} name="title"/>
                    {errors.title && <span className="invalid-feedback">{errors.title.message}</span>}
                </div>
                <div className="row">
                <label htmlFor="country" >{country ? "Your post is about" + country.label : "Select your country"} </label>
                    { country ?
                        <input className="form-control disabled" value={country.value} name="country" disabled ref={register} />
                        :
                        <Controller
                            name="country"
                            control={control}
                            options={options}
                            as={Select}
                        />}
                </div>
                <div className="row ">
                <label htmlFor="post_content" >Tap your post here</label>
                <textarea rows="11" className={errors.firstname ? "form-control is-invalid " : "form-control "} type="text" id="post_content" ref={register({required: 'Content is required'})} name="post_content" placeholder="Enter your content here"/>
                {errors.firstname && <span className="invalid-feedback">{errors.firstname.message}</span>}
            </div>
                <div className="row my-3">
                    <Button disabled={isSubmitting} type="submit" variant="outlined" color="primary" className="w-100">Post {isSubmitting &&
                    <div className="spinner-border" role="status">
                    </div>
                    }
                    </Button>
                </div>
            </form>
                </div>
            </div>
    )
}
