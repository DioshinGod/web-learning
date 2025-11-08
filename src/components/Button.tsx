interface Props {
    text: string
    onClick: () => void
}
export const Button = ({ text, onClick }: Props) => {
    return (
        <button
            className="cuP coWhite pd0_5em br0_5em bgSb1 ho-bgSb2"
            onClick={onClick}
            style={{
                boxShadow:'2px 2px 2px 2px rgb(23 120 116)',


            }}
        >
            {text}
        </button>
    )
}