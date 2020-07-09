import {overlay} from "./overlay"
import styles from './overlay.css'
const on = document.getElementsByClassName(styles.overlay)
const done = document.getElementsByClassName("overlay-exit-done")
if (on.length === done.length){
	overlay()
}