'use client';
import './Cooking.css';

export default function CookingPage() {
    return (	
        <div class="img-box">
            <header>
                <h1 class="h1text">Cooking Tips</h1>
            </header>
            <main>
                <section>
                    <img src="pictures/spaghetti.jpg" alt="Spaghetti"/>
                </section>

                <section>
                    <h2 class="h2text">Before Cooking</h2>
                    
                    <article>
                        <h3 className="h3text">1. Find recipes from Cooking Book or website</h3>

                        <a href="https://www.amazon.com/Beginners-Cookbook-Usborne-Cookbooks/dp/0746085389" class="button01">Book link</a>
                        <br></br>
                        <br></br>
                        <a href="https://www.pacificfoods.com/recipes/?recipe-tags=most-loved&orderby=asc&gad_source=1&gclid=Cj0KCQiApNW6BhD5ARIsACmEbkVVvi9XTSLe_u0ndzIwDnT8vJjWTYmHc551Rg6mjtpD8T1yn0E0EyUaAlKMEALw_wcB" class="button02">Website link</a>
                        <p className="h4text">
                            A cooking book or website are valuable resources for both beginners and experienced cooks.<br></br>
                            It provides structured recipes, new techniques, and a variety of cuisines, helping you expand your culinary skills.<br></br>
                            hey also inspire creativity, make meal planning easier, and allow you to learn at your own pace, without needing an internet connection. Plus, they offer a hands-on experience, <br></br>
                            letting you personalize your cooking journey with notes and favorite recipes.<br></br>
                        </p>
                    </article>
                    
                    <article>
                        <h3 className="h3text">2. Prepare Your Ingredients (Mise en Place)</h3>
                        <p className="h4text">
                        Before you start cooking, it's efficient to measure all your ingredients, chop them, and do any necessary prep work in advance.
                        This preparation is called "Mise en Place," a French term that means "everything in its place."
                        </p>
                    </article>
                    
                    <article>
                        <h3 class="h3text">3. Wash Your Hands</h3>
                        <p class="h4text">
                            We need to wash our hands before cooking to prevent the spread of harmful bacteria and germs that can contaminate food.<br></br>
                            This helps reduce the risk of foodborne illnesses and ensures that the food we prepare is safe to eat. <br></br>
                            Clean hands also prevent cross-contamination, where bacteria from raw foods, like meat or eggs, can transfer to other ingredients or cooking surfaces.
                        </p>

                        <div className="mt-6">
                            <iframe
                                width="650"
                                height="350"
                                src="https://www.youtube.com/embed/IisgnbMfKvI?si=4yYt7P-I1OCcgk7p"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                    </article>
                    <h2 class="h2text">When you are Cooking</h2>
                    <article>
                        <h4 className="h3text">1. Start with Simple Recipes </h4>
                        <p className="h4text">
                            Begin with easy, straightforward recipes that don't require many steps.<br></br>
                            Dishes like scrambled eggs, stir-fries, or simple salads are good starting points for beginners.
                        </p>
                    </article>
                    <article>
                        <h4 className="h3text">2. Consider safety </h4>
                        <p className="h4text">
                           Be very careful when using knives or hot pots. When using fire, avoid placing flammable materials around it, and take thorough safety precautions, especially if there are children in the household. Be careful not to cut your hands or burn yourself.
                           Inadditon, pay special attention to how you handle ingredients, especially raw meat or fish. Ensure that raw meat is cooked thoroughly, and always wash your hands and utensils thoroughly after handling these items to avoid contamination.
                        </p>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/6lMA1VYSU9I?si=JpYVZNUoeTCIUKBo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/_4MMHx8d4MA?si=CrGhp81wbuEMBoPk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </article>
                    <article>
                        <h4 className="h3text">3. Accurate measurements </h4>
                        <p className="h4text">
                            Measuring in cooking is important, especially for beginners. Use measuring spoons and measuring cups,<br></br> 
                            especially for spices and seasonings, as even small differences can greatly affect the taste.
                        <br></br>
                        <img src="pictures/cooking_2.jpg" alt="measurement tools" width="600" height="400"/>
                        </p>
                    </article>
                    <article>
                        <h4 className="h3text">4. Don't Forget to Taste</h4>
                        <p className="h4text">
                           Make sure to taste your food along the way and adjust seasonings as needed. <br></br>
                           By carefully balancing the flavors and making small adjustments, you'll significantly improve the final result.
                        </p>
                    </article>
                    <h2 class="h2text">After Cooking</h2>
                    
                    <article>
                        <h3 className="h3text">1. Eat first</h3>
                        <p className="h4text">
                            The cleaning can wait until later. For now, let's enjoy the freshly made, delicious meal!
                        </p>
                    </article>
                    <article>
                        <h3 className="h3text">2. Clean Up Thoroughly</h3>
                        <p className="h4text">
                        Don't forget to clean up. Wash your utensils and dishes promptly and keep your kitchen clean. It's important to maintain cleanliness after cooking.
                        </p>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/bC0enZGyHoY?si=e8hQXj2SG28fbx7T" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </article>
                    <article>
                       <h2 class="h5text">Important Tips for cooking</h2>
                       <h3 className="h3text">1. Don't Worry About Mistakes</h3>
                        <p className="h4text">
                        Things might not go perfectly at first, and that's okay! With practice, you'll improve, and mistakes will help you learn, making your future dishes even better.
                        </p>
                        <h3 className="h3text">2. Keep the Joy of Cooking</h3>
                        <p className="h4text">
                            Cooking should be fun. Don't let the pressure of perfection stress you out. Relax, enjoy the process, and focus on having fun while you cook!
                        </p>
                    </article>
                    
                    <p><a href="Quiz.html" class = "button03">Quiz!</a></p>
                </section>
            </main>
        </div>
    );
}