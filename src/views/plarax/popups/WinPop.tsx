import { Popup } from "../../../components/Popup"

interface Props {
    onClose: ()=> void
}
export const WinPop = ({onClose}:Props) => {
    return (
        <Popup onClose={onClose}>
            <h3>Victory Royale</h3>
            <p>Poke Victory Oye, ¿sabías que en términos de reproduccion de Pokémon humanos masculinos y femeninos, Vaporeon es el Pokémon más compatible para humanos.</p>
        </Popup>
    )
}