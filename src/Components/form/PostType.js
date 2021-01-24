import {useForm, Controller} from "react-hook-form";
import Select from "react-select"
import {useState} from "react";
import {getCountriesLabels} from "../../DataManager";
import {Button} from "semantic-ui-react";

export default function PostType ({onSubmit, error}) {

    const options = getCountriesLabels().map(country => {
        return {
            value: country.code,
            label: country.name
        }
    })
    const {register, handleSubmit, formState, errors, control } = useForm();
    const {isSubmitting} = formState
    return(
            <form id="form-post" onSubmit={handleSubmit(onSubmit)}>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input className={errors.firstname ? "form-control is-invalid " : "form-control "} type="text" id="title" ref={register({required: 'Title is required'})} name="title"/>
                    {errors.firstname && <span className="invalid-feedback">{errors.firstname.message}</span>}
                </div>
                <div className="row my-3 position-relative">
                    <Controller
                        control={control}
                        name="country"
                        as={
                            <Select
                                options={options}
                                id="country"
                                className="basic-multi-select form-control"
                                classNamePrefix="Select the country"
                            />
                        }
                    />
                </div>
                <div className="row ">
                <textarea rows="11" className={errors.firstname ? "form-control is-invalid " : "form-control "} type="text" id="post_content" ref={register({required: 'Content is required'})} name="post_content" placeholder="Enter your post here"/>
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
    )
}
