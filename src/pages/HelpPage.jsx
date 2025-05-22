import NavBar from '../components/NavBar/NavBar';

import './HelpPage.css';

export default function HelpPage() {
  let acc = document.getElementsByClassName('accordion');

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function () {
      this.classList.toggle('active');
      let panel = this.nextElementSibling;
      if (panel.style.display === 'block') {
        panel.style.display = 'none';
      } else {
        panel.style.display = 'block';
      }
    });
  }

  return (
    <>
      <NavBar />
      <div id='main' className='main'>
        <article>
          <br />
          <br />
          <br />
          <h1>FAQ</h1>
          <br />
          <details>
            <summary>
              <strong>How do I create an account?</strong>
            </summary>
            <div className='text'>
              <em>An account can be opened through the login portal, by selecting don't have an account. </em>
            </div>
          </details>
          <details>
            <summary>
              <strong>Can an account be used by more than one person?</strong>
            </summary>
            <div className='text'>
              <em> No, only one person should have access to an account. </em>
            </div>
          </details>
          <details>
            <summary>
              <strong>Can I watch a movie more than one time?</strong>
            </summary>
            <div className='text'>
              <em>Yes, you can watch a movie as many times as you want during your rental period.</em>
            </div>
          </details>
          <details>
            <summary>
              <strong>Am I allowed to use multiple devices?</strong>
            </summary>
            <div className='text'>
              <em>Yes, you can log on and watch on multiple devices but not at the same time.</em>
            </div>
          </details>
          <details>
            <summary>
              <strong>Will more movies be added?</strong>
            </summary>
            <div className='text'>
              <em>Yes we intend to add more movies in the future, although there is not a fixed date for this.</em>
            </div>
          </details>
        </article>
      </div>
    </>
  );
}
