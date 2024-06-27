
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
    let input;
    if (required) {
        input = <input required id={`${id}-input`} type={type} placeholder={placeholder} onChange={(e) => { setValue(e.target.value) }} />
    } else {
        input = <input id={`${id}-input`} type={type} placeholder={placeholder} onChange={(e) => { setValue(e.target.value) }} />
    }

    return (
        <div className={passwordSame ? 'auth-input-container' : 'auth-input-container-diff-password'}>
            <div className='auth-input-label-container'>
                <label htmlFor={`${id}-input`}>{label}</label>
                {required ? <p className='auth-required-asterisk'>*</p> : null}
            </div>
            <div className='auth-input-icon-container'>
                <Icon className="auth-icon" />
                {input}
            </div>
        </div>
    )
}
