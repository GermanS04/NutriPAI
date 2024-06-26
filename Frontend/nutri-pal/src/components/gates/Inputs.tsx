
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
}


export const Inputs = ({ id, label, placeholder, Icon, type, setValue, required }: InputProps) => {
    let input;
    if (required) {
        input = <input required id={`${id}-input`} type={type} placeholder={placeholder} onChange={(e) => { setValue(e.target.value) }} />
    } else {
        input = <input id={`${id}-input`} type={type} placeholder={placeholder} onChange={(e) => { setValue(e.target.value) }} />
    }

    return (
        <div className='auth-input-container'>
            <label htmlFor={`${id}-input`}>{label}</label>
            <div className='auth-input-icon-container'>
                <Icon className="auth-icon" />
                {input}
            </div>
        </div>
    )
}
