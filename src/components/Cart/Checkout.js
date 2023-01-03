import classes from './Checkout.module.css'
import { useRef, useState } from "react";

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = props => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const [ formInputsValidity, setFormInputsValidity ] = useState( {
        name: true,
        street: true,
        postalCode: true,
        city: true
    } );

    const confirmHandler = event => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty( enteredName );
        const enteredStreetIsValid = !isEmpty( enteredStreet );
        const enteredPostalCodeIsValid = isFiveChars( enteredPostalCode );
        const enteredCityIsValid = !isEmpty( enteredCity );

        setFormInputsValidity( {
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalCodeIsValid,
            city: enteredCityIsValid
        } );

        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredPostalCodeIsValid &&
            enteredCityIsValid;

        if ( !formIsValid ) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity
        });
    };

    return (
        <form className={ classes.form } onSubmit={ confirmHandler }>
            <div className={ `${ classes.control } ${ formInputsValidity.name ? '' : classes.invalid }` }>
                <label htmlFor='name'>Your Name</label>
                <input ref={ nameInputRef } type='text' id='name'/>
                { !formInputsValidity.name && <p>Please enter a valid name!</p> }
            </div>
            <div className={ `${ classes.control } ${ formInputsValidity.street ? '' : classes.invalid }` }>
                <label htmlFor='street'>Street</label>
                <input ref={ streetInputRef } type='text' id='street'/>
                { !formInputsValidity.street && <p>Please enter a valid street!</p> }
            </div>
            <div className={ `${ classes.control } ${ formInputsValidity.postalCode ? '' : classes.invalid }` }>
                <label htmlFor='postal'>Postal Code</label>
                <input ref={ postalCodeInputRef } type='text' id='postal'/>
                { !formInputsValidity.postalCode && <p>Please enter a valid postal code (5 characters long)!</p> }
            </div>
            <div className={ `${ classes.control } ${ formInputsValidity.city ? '' : classes.invalid }` }>
                <label htmlFor='city'>City</label>
                <input ref={ cityInputRef } type='text' id='city'/>
                { !formInputsValidity.city && <p>Please enter a valid city!</p> }
            </div>
            <div className={ classes.actions }>
                <button type='button' onClick={ props.onCancel }>Cancel</button>
                <button className={ classes.submit }>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
