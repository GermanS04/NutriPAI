
import '@/styles/inputForm.css'

type IconProps = {
    className?: string;
};

interface InputProps {
    id: string;
    label: string;
    placeholder: string;
    Icon: React.ComponentType<IconProps>;
    type: string;
    setValue: Function;
    required: boolean;
    passwordSame?: boolean;
}


export const Inputs = ({ id, label, placeholder, Icon, type, setValue, required, passwordSame = true }: InputProps) => {
    // if the input is a required field then its declared with the required attribute
    let input;
    if (required) {
        input = <input required id={`${id}-input`} type={type} placeholder={placeholder} onChange={(e) => { setValue(e.target.value) }} />
    } else {
        input = <input id={`${id}-input`} type={type} placeholder={placeholder} onChange={(e) => { setValue(e.target.value) }} />
    }


    return (
        <div className={passwordSame ? 'auth-input-container' : 'auth-input-container-diff-password'}> {/* passwordSame is to check if the password and confirm password have the same content, it's an optional attribute that is set to true by default */}
            <div className='auth-input-label-container'>
                <label htmlFor={`${id}-input`}>{label}</label>
                {required ? <p className='auth-required-asterisk'>*</p> : null} {/* if the input is required then put a red asterisk on its right  */}
            </div>
            <div className='auth-input-icon-container'>
                <Icon className="auth-icon" />
                {input}
            </div>
        </div>
    )
}
