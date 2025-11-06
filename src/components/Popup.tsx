import close from '../assets/icons/close-circle-svgrepo-com.svg'
interface Props {
    children: React.ReactNode
    onClose : () => void
}
export const Popup = ({ children, onClose }: Props) => {
    return (
        <div className="bgSG posF w100vw h100vh T0 aiC dpF jcC"
            style={{ backgroundColor: '#ff456266' }}
        >
            <div className="posR bgP br0_5em pd1em dpF fdC aiC g1em"
                style={{ width: '25em', maxWidth: '90vw' }}
            >
                <div className="posA h2em w2em cuP"
                style={{top:'0.5em', right:'0.75em'}}
                onClick={onClose}
                >
                    <img className='w100pc'src={close} alt=""/>
                </div>
                {children}
            </div>

        </div>
    )
}