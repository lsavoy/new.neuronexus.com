const probeFinderRepo = require("probe_finder/repositories/probe_finder.repository");
const mailer = require('../../helpers/mailer.js');

const channelsRepo = require("channels/repositories/channels.repository");
const experimentRepo = require("experiment/repositories/experiment.repository");
const shankLengthRepo = require("shank_length/repositories/shank_length.repository");
const shanksRepo = require("shanks/repositories/shanks.repository");
const siteAreaRepo = require("site_area/repositories/site_area.repository");
const siteLayoutRepo = require("site_layout/repositories/site_layout.repository");

class probeFinderController {
	constructor() { }


	async probeFinderList(req, res) {
		try {
            var and_clauses = []
            var conditions = {"isDeleted" : false,"status" : "Active"};
            
            if(req.body.site_layout_id != ''){
               if (_.isObject(req.body) && _.has(req.body, 'site_layout_id')) {
                  and_clauses.push({
                        $or: [
                           { site_layout_id: {$in:req.body.site_layout_id} },
                        ]
                  })
               }
            }
            if(req.body.site_area_id != ''){
               if (_.isObject(req.body) && _.has(req.body, 'site_area_id')) {
                  and_clauses.push({
                     $or: [
                        { site_area_id: {$in:req.body.site_area_id} },
                     ]
                  })
               }
            }
             if(req.body.shanks_id != ''){
               if (_.isObject(req.body) && _.has(req.body, 'shanks_id')) {
                  and_clauses.push({
                     $or: [
                        { shanks_id: {$in:req.body.shanks_id} },
                     ]
                  })
               }
             }
             if(req.body.shank_length_id != ''){
               if (_.isObject(req.body) && _.has(req.body, 'shank_length_id')) {
                  and_clauses.push({
                       $or: [
                          { shank_length_id: {$in:req.body.shank_length_id} },
                       ]
                  })
               }
             }
             if(req.body.experiment_id != ''){
               if (_.isObject(req.body) && _.has(req.body, 'experiment_id')) {
                  and_clauses.push({
                     $or: [
                        { experiment_id: {$in:req.body.experiment_id} },
                     ]
                  })
               }
             }
             if(req.body.channel_id != ''){
               if (_.isObject(req.body) && _.has(req.body, 'channel_id')) {
                  and_clauses.push({
                     $or: [
                        { channel_id: {$in:req.body.channel_id} },
                     ]
                  })
               }
             }
             if(and_clauses.length > 0){
                conditions['$and'] = and_clauses
             }
                let probe = await probeFinderRepo.getAllByField(conditions)
                if(probe){
                    return { status: 200, data: probe, message: 'Data fetched Successfully' };
                }
		}
		catch (error) {
			return { status: 500, data: [], message: error.message };
		}
	}

   async probeFinderDetails(req, res) {
      try{
         let probeFinder = await probeFinderRepo.getByField({'slug':req.params.slug});
         if(!_.isEmpty(probeFinder)){
            return { status: 200, data: probeFinder, message: 'Data fetched Successfully' };
         }else{
            return { status: 201, data: [], message: 'Data not found' };
         }
      }
      catch(e){
         return { status: 500, data: [], message: e.message };
      }
   }

   async MasterList(req, res) {
      try{
         let channels = await channelsRepo.getAllByField({'status':'Active','isDeleted':false});
         let experiment = await experimentRepo.getAllByField({'status':'Active','isDeleted':false});
         let shankLength = await shankLengthRepo.getAllByField({'status':'Active','isDeleted':false});
         let shank = await shanksRepo.getAllByField({'status':'Active','isDeleted':false});
         let siteArea = await siteAreaRepo.getAllByField({'status':'Active','isDeleted':false});
         let siteLayout = await siteLayoutRepo.getAllByField({'status':'Active','isDeleted':false});

         return { status: 200, channels: channels,experiment: experiment,shankLength: shankLength,shank: shank,siteArea: siteArea,siteLayout: siteLayout, message: 'Data fetched Successfully' };

      }
      catch(e){
         return { status: 500, data: [], message: e.message };
      }
   }

}

module.exports = new probeFinderController();
