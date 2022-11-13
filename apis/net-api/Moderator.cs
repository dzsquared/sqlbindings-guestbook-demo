using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.CognitiveServices.ContentModerator;
using Microsoft.Azure.WebJobs.Extensions.Sql;


namespace Azure.Samples
{
    public static class Moderator
    {
        [FunctionName("Moderator")]
        public static void Run(
            [SqlTrigger("app.Entry", ConnectionStringSetting = "SqlConnectionString")] IReadOnlyList<SqlChange<Entry>> changes,
            [Sql("app.Entry", ConnectionStringSetting = "SqlConnectionString")] out Entry[] entryUpdates,
            ILogger log)
        {
            List<Entry> updates = new List<Entry>();
            // content moderation setup
            string SubscriptionKey = Environment.GetEnvironmentVariable("ModeratorKey");
            string ContentEndpoint = Environment.GetEnvironmentVariable("ModeratorEndpoint");
            ContentModeratorClient clientText = new ContentModeratorClient(new ApiKeyServiceClientCredentials(SubscriptionKey));
            clientText.Endpoint = ContentEndpoint;

            foreach (SqlChange<Entry> change in changes)
            {
                log.LogInformation($"Change operation: {change.Operation}");
                if (change.Operation == SqlChangeOperation.Insert)
                {
                    // send the new entry for moderation
                    string toModerate = change.Item.TextEntry;
                    using (Stream stream = GenerateStreamFromString(toModerate)) {
                        var contentScreen = clientText.TextModeration.ScreenText("text/plain", stream, "eng", false, false, null, false);
                        if (contentScreen.Terms != null && contentScreen.Terms.Count > 0) {
                            // if there are profane terms, mark the entry as disabled
                            Entry toDisable = change.Item;
                            toDisable.DisableView = true;
                            updates.Add(toDisable);
                        }
                    }
                }
            }
            if (updates.Count > 0)
            {
                entryUpdates = updates.ToArray();
            }
            else
            {
                entryUpdates = null;
            }
        }

        private static Stream GenerateStreamFromString(string s)
        {
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream);
            writer.Write(s);
            writer.Flush();
            stream.Position = 0;
            return stream;
        }
    }
}
