const navBottomMenuClick = (event) => {
  document.querySelectorAll('.target').forEach((target) => {
    target.nextElementSibling.style.fill = 'rgb(177, 177, 177)'
    target.nextElementSibling.nextElementSibling.style.color = 'rgb(117, 117, 117)'

    if (target.classList.contains('target-home')) {
      target.nextElementSibling.style.fill = 'transparent'
      target.nextElementSibling.style.stroke = 'rgb(177, 177, 177)'
    }

    if (target.classList.contains('target-search')) {
      target.nextElementSibling.innerHTML = `
        <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z" />
      `
    }

  })

  if (event.target.classList.contains('target-search')) {
    event.target.nextElementSibling.innerHTML = `
      <path d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z" />
      <path d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 0 1-2.077 5.816l4.344 4.344a1 1 0 0 1-1.414 1.414l-4.353-4.353a9.454 9.454 0 0 1-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z" />
    `
  }
  event.target.nextElementSibling.style.fill = 'white'
  event.target.nextElementSibling.nextElementSibling.style.color = 'white'
}

export default navBottomMenuClick