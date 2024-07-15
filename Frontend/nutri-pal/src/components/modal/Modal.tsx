
import '@/styles/Modal.css'

type ModalProps = {
    content?: any,
    modalToggle: Function,
    width?: number,
    height?: number
}

export const Modal = ({ content, modalToggle, width = 50, height = 75 }: ModalProps) => {

    return (
        <div className='modal-container'>
            <div className='modal-overlay' onClick={() => modalToggle()} />
            <div className='modal-content' style={{ width: `${width}%`, height: `${height}%` }}>
                {content}
            </div>
        </div>
    )
}
