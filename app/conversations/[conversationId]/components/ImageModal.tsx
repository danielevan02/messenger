'use client'

import Modal from "@/app/components/Modal"
import Image from "next/image"

type ImageModalProps = {
  src?: string | null
  onClose: ()=>void
  isOpen?: boolean
}

const ImageModal: React.FC<ImageModalProps> = ({onClose, isOpen, src}) => {
  if(!src) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image
          src={src}
          className="object-cover"
          fill
          alt="Image"
        />
      </div>
    </Modal>
  );
}
 
export default ImageModal;