import Styles from './presente.module.css'; // Importa o arquivo de css.

export default function Presente() {
    return (
        <div className={Styles.presente}> {/* Div principal que encapsula o presente. */}
            <div className={Styles.topo}></div> {/* Div para representar a parte superior do presente. */}
            <div className={Styles.base}> {/* Div que representa a base do presente. */}
                <div className={Styles.laco2}></div> {/* Div que representa um dos laços do presente. */}
            </div>
            <div className={Styles.laco1}></div> {/* Div que representa o outro laço do presente. */}
        </div>
    );
}
