export const weclomeEmail = (context: { username: string; appUrl: string }) => {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.cdnfonts.com/css/campton" rel="stylesheet"></link>
    <title>Welcome to CVP</title>
  </head>

  <style>
    .mainContainer {
      background: #f9f5ff;
      font-family: "Campton";
      width: 600px;
      height: 600px;
      padding: 32px;
      margin: 0 auto;
      gap: 8px;
      left: 24716px;
      top: 19955px;
    }

    .boxContainer {
      background: #fff;
      padding: 40px;
      width: 520px;
      height: 400px;
    }

    .boxContainer h1 {
      color: #7f56d9;
      font-family: "Campton";
      padding-bottom: 20px;
      margin-top: 0;
      padding-top: 0;
      height: 16px;
      font-size: 24px;
    }

    .boxContainer h2 {
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
      padding-bottom: 20px;
    }

    .textBox {
      width: 500px;
      height: 200px;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      padding-bottom: 20px;
    }

    button {
      padding: 10px 18px;
      background: #7f56d9;
      box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
      border-radius: 8px;
      border: 1px solid #7f56d9;
      font-family: "Campton";
      outline: none;
      width: 143px;
      height: 44px;
    }

    button a {
      text-decoration: none;
      color: #fff;
    }

    .footerText {
        height: 74px;
        width: 500px;
        left: 40px;
        padding-top: 20px;
        margin: 0 auto;

    }

    .footerText p {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
    }

    span {
        color: #6941C6;
    }
  </style>

  <body>
    <div class="mainContainer">
        <div class="boxContainer">
            <h1>C V P</h1>
            <h2>Welcome</h2>

            <div class="textBox">
            <p>Hi ${context.username},</p>

            <p>
                Welcome to the community! Did you know that over 1,000+ people use
                their CVP every day? It's a great day to build that winning CV and
                Portfolio.
            </p>

            <p>
                What are you going to do with yours? Follow the link below to create
                your very first CV or Portfolio and join thousands of other users
                around the globe!
            </p>
            </div>

            <button><a href="${context.appUrl}">Start Building</a></button>

        </div>


    
        <div class="footerText">
            <p>
                Questions or concerns? Get in touch with us at <span>hello@CVP.com</span> or <span>join our
                Slack community.</span> Never miss a beat! Follow us on <span>Instagram</span>  
                and <span>Twitter.</span>
            </p>

            <p>Don't want any more emails from CVP? <span>Unsubscribe</span></p>
        </div>

    </div>
  </body>
</html>
    `;
};
