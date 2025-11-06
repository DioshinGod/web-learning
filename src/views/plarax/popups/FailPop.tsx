import { Popup } from "../../../components/Popup"

interface Props {
    onClose: ()=> void
}
export const FailPop = ({onClose}:Props) => {
    return (
        <Popup onClose={onClose}>
            <h3>You lost, kkkkk</h3>
            <p>Poke Derrota Pernahkah kamu bertanya-tanya dari mana asal nama Pokémon? Itu gabungan dari kata "Pocket" dan "Monster", yang jika digabungkan berarti "Monster Saku". Sesederhana itu </p>
        </Popup>
    )
}