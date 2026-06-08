import styles from './ArcInput.module.css'

export default function ArcInput({ copy }) {
  return (
    <section className={styles.section}>
      <div className={styles.row}>
        <input
          className={styles.field}
          type="text"
          placeholder={copy.inputPlaceholder}
          readOnly
        />
        <button className={styles.button} type="button">
          {copy.addButton}
        </button>
      </div>
    </section>
  )
}
