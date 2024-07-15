
import '@/styles/Modal.css'

type ModalProps = {
    content?: any,
    modalToggle: Function,
    width?: number,
    height?: number,
    children?: React.ReactNode
}

export const Modal = ({ content, modalToggle, width = 50, height = 75, children }: ModalProps) => {

    return (
        <div className='modal-container'>
            <div className='modal-overlay' onClick={() => modalToggle()} />
            <div className='modal-content' style={{ width: `${width}%`, height: `${height}%` }}>
                {content}
                {children}
            </div>
        </div>
    )
}
