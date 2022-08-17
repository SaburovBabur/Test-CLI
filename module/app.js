async function main() {
    const { firstName } = await import('./chars.js')

    console.log(firstName)
}

main()
