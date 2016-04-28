-------------------------------------------------------------------------------

                              ASSIGNMENT 2 README                              
                              COGS121 Spring 2016                              
       Allan Asis, Hui Chen, Gabriel Gaddi, Michelle Nguyen, Alicia Ning       

-------------------------------------------------------------------------------

[ HEURISTICS ] ----------------------------------------------------------------

	i.  Discoverability/Signifiers
		The interface provides the users to easily find key areas of interest 
		when looking at the embedded map. The amount of markers around a district 
		provides instant indication of more densily populated areas where people 
		pay for housing by rent. Additionally, markers are clustered based 
		on nearest distance from one another so that the user can know 
		the number of significant regions in an area without being 
		overwhelmed by the sheet amount of markers if shown all at once.  

		The sidebar provides ease of access to rental analytics of 
		a clicked district via pie chart, or they can toggle to view 
		statistics of all significant areas.

	ii. Learnability
		Borrowing from Google Maps, well established in delivering crisp map service, 
		we utilize its functions of intuitive mouse controls. Functions 
		to toggle between current or all districts and displaying 
		a district's statistics most often only requires a single click. 

	iii. Feedback
		Users receive instant from the feedback from the color ranges 
		of the dot clusers on the map where the color of the cluster
		 represents how dense a part of the map is in terms of additional 
		 districts. The higher the number in the cluster, 
		 the more key districts there within the cluster. 

		From clicking a red pinpoint marker on the map, it instantly 
		displays home rental statistics of that area selected.
		 the sidebar displays the region's name so you know what 
		 district you're looking at, and it centers the map screen 
		 on the marker selected. 


	iv. Natural Mapping/Mental Metaphors
		The app contextualizes districts by showing where they are located with a map. 
		Apart from just listing each area with its rental prices, 
		mapping onto the real world allows users to infer the best 
		places from linking topographic information with rental 
		statistics. This is especially for users unfamiliar with 
		San Diego county where instead of going through a list of 
		districts, they can explore through the map based on 
		geographical cues. finding rental statistics for homes 
		near the coastline versus those near freeways becomes 
		valuable with this geo mapping. 

	v.	Constraints
		The map is initially zoomed in constraining the view to 
		just san diego county. Only 1 pie chart is displayed 
		per district clicked. 

	

	vi. Error Prevention/Recovery
		If the user zooms out to the point of losing San Diego county, 
		the map resets back onto SD county. If a user zooms out more 
		than their liking to the point of losing San Diego county, 
		the map autocenters and resets to the default zoom.

[ Design Decisions ] -------------------------------------------------------------
		
		Initially we had thought of drawing our own landscape and 
		district boundaries through D3, but it would lack the interactvity 
		of being able to contextualize the map on its topography.
		We turned to the google maps api and utilzied its marker system to 
		denote our focused districts, however this led to a cumbersome 
		amount of visual information flooding across the map. We then 
		debated over the use of abstracted markers into clusters. On concern 
		that arose was losing acuity where users must click more to find a 
		particular district within a cluster. We decided to use clusters 
		in the end because it allowed us to solve our visual overloading as 
		it was of higher priority to us. The utilization of a sidebar allows us to 
		display relevant information readily without needing 
		to overlay anything onto the map. 
	

[ CONTRIBUTIONS ] -------------------------------------------------------------

	Allan:		
		Worked on part 1. Helped with marker functionality and map 
		constraining events. Helped drive design ideations and decisions.  

	Veronica:	
		Completed with part 2. Helped develop backend with connecting 
		postgres to app and filtering it to display relevant information 
		through d3. Tutored rest of team in working with backend. 

	Gabriel:	
		Worked on Part 1 along with Veronica. 
		Helped with initial design ideas and map functionality. 

	Michelle:	
		Worked mostly on front-end. Helped design layout of our app. 
		Drove design designs of data visualizations. 
		Organized visuals through css.

	Alicia:
		Worked alongside Michelle on the front-end. 
		Helped integrating google maps api and implementing 
		its interactive functions. 