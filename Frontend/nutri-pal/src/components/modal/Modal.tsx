
import '@/styles/Modal.css'

interface ModalProps {
    content?: any,
    modalToggle: any
}

export const Modal = ({ content, modalToggle }: ModalProps) => {

    return (
        <div className='modal-container'>
            <div className='modal-overlay' onClick={() => modalToggle()} />
            <div className='modal-content'>
                a
            </div>
        </div>
    )
}
