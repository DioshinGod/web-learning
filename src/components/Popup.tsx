interface Props {
    children: React.ReactNode
}
export const Popup = ({ children }: Props) => {
    return (
        <div className="bgSG posF w100vw h100vh T0 aiC dpF jcC"
            style={{ backgroundColor: '#ff456266' }}
        >
            <div className="bgP br0_5em pd1em dpF fdC aiC g1em"
                style={{ width: '25em', maxWidth: '90vw' }}
            >
                {children}
            </div>

        </div>
    )
}