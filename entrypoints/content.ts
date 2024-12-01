// Define the content script using `wxt`
export default defineContentScript({
  // Ensure this matches the desired YouTube URL pattern
  matches: ["*://x.com/*"],

  main(): void {
    let twitterMiddle: HTMLElement | null,
      youtubePlayer: HTMLElement | null;
    let currentVideo = "";

    chrome.runtime.onMessage.addListener(
      (
        request: { type: string; value?: string; videoId?: string },
        sender,
        sendResponse
      ) => {
        const { type, value } = request;

        if (type === "NEW") {
          console.log(value);
          newVideoLoaded();
          // foryourender();
        }
      }
    );
    async function followAllUsers() {
      console.log("Follow All button clicked");
      
      await foryourender();
      await followUsers();
      console.log("Follow All operation completed.");
    }

   

    // check the current url and render to the for you tab
    const foryourender = async()=>{
      const currentUrl = window.location.href;
    // console.log(currentUrl)
    const waitForElement = async (selector: string, timeout = 3000) => {
      return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          const element = document.querySelector(selector);
          if (element) {
            clearInterval(interval);
            resolve(element);
          }
        }, 100);
    
        setTimeout(() => {
          clearInterval(interval);
          reject(new Error("Element not found within timeout"));
        }, timeout);
      });
    };
    
    if (currentUrl !== "https://x.com/home") {
      window.location.href = "https://x.com/home";
      await delay(1000);
      await waitForElement('.r-1777fci'); 
    }
      const forYouTab = document.getElementsByClassName('r-1777fci')[16] // "For You" tab
  const followingTab = document.getElementsByClassName('r-1777fci')[18] // "Following" tab


  // shift to for you tab
  if (forYouTab && followingTab) {
      if (followingTab.getAttribute('aria-selected') === "true") {
          forYouTab.setAttribute('aria-selected', 'true');
          followingTab.setAttribute('aria-selected', 'false');
          followingTab.setAttribute('tabindex',"-1");
          forYouTab.removeAttribute('tabindex');
          
          (forYouTab as HTMLElement).click();
      }
  }
    }

    // autamatically follow the users
    async function followUsers() {
      // Get all tweet containers
      const tweetContainers = document.querySelectorAll(
        'article[role="article"]'
      );
      for (let index = 0; index < tweetContainers.length; index++) {
        // Simulate hovering over the user profile picture
        const userAvatar = tweetContainers[index].querySelector(
          'a[role="link"]'
        );
        console.log(userAvatar)
        if (userAvatar) {
          // Trigger hover event
          const mouseOverEvent = new MouseEvent("mouseover", {
            bubbles: true,
            cancelable: true,
          });
          userAvatar.dispatchEvent(mouseOverEvent);

          await new Promise(async(resolve) => setTimeout(resolve, await randomDelay(2000, 2500)));
            const followButton = document.querySelector(
              'button'
            );
            const followbtns = document.querySelectorAll('button[aria-describedby*="id"]');
            

            for(let i = 0; i<followbtns.length; i++){
              console.log("followbtns", followbtns[i]);
              if((followbtns[i] as HTMLElement)?.innerText==="Follow"){
                // console.log("reach")              
                (followbtns[i] as HTMLElement).click();
              }
            }
        }
      };
    }

    async function delay(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // delay function
    async function randomDelay(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // to insert the button
    const newVideoLoaded = (): void => {
      const bookmarkBtnExists =
        document.getElementsByClassName("bookmark-btn")[0];
      if (!bookmarkBtnExists || bookmarkBtnExists === undefined) {
        // adding css to button
        const bookmarkBtn = document.createElement("button");
        bookmarkBtn.className = "ytp-button bookmark-btn";
        bookmarkBtn.title = "Click to bookmark timestamp";
        bookmarkBtn.innerText = "Follow All";
        bookmarkBtn.style.position = "fixed"; 
        bookmarkBtn.style.top = "20px"; 
        bookmarkBtn.style.right = "20px"; 
        bookmarkBtn.style.zIndex = "10000"; 
        bookmarkBtn.style.padding = "10px 20px";
        bookmarkBtn.style.backgroundColor = "#1da1f2"; 
        bookmarkBtn.style.color = "#fff"; 
        bookmarkBtn.style.border = "2px solid #ff4500"; 
        bookmarkBtn.style.borderRadius = "10px"; 
        bookmarkBtn.style.cursor = "pointer"; 
        bookmarkBtn.style.margin = "0"; 
        bookmarkBtn.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.2)"; 
        bookmarkBtn.style.transition = "transform 0.2s, box-shadow 0.2s"; 
        bookmarkBtn.onmouseover = () => {
          bookmarkBtn.style.transform = "scale(1.1)"; 
          bookmarkBtn.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.3)"; 
        };
        bookmarkBtn.onmouseout = () => {
          bookmarkBtn.style.transform = "scale(1)"; 
          bookmarkBtn.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.2)"; 
        };

        // Append the button to twitter controls
        twitterMiddle = document.getElementsByClassName('r-th6na ')[0] as HTMLElement;
        if (twitterMiddle) {
          twitterMiddle.appendChild(bookmarkBtn);
        }

        // Add click event listener to the bookmark button
        bookmarkBtn.addEventListener("click", followAllUsers);
      }
    };
    newVideoLoaded();
  },
});


